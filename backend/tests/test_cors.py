# CORS tests verifying the env-based CORS_ORIGINS refactor works correctly
import pytest
import requests
import os
from pathlib import Path

if not os.environ.get('REACT_APP_BACKEND_URL'):
    frontend_env_path = Path("/app/frontend/.env")
    if frontend_env_path.exists():
        with open(frontend_env_path) as f:
            for line in f:
                if "REACT_APP_BACKEND_URL" in line:
                    parts = line.strip().split("=")
                    if len(parts) > 1:
                        os.environ['REACT_APP_BACKEND_URL'] = parts[1].strip()

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://rn-capital.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api_client():
    return requests.Session()


class TestCORS:
    """CORS middleware tests after env-based refactor (CORS_ORIGINS='*')"""

    def test_cors_preflight_options_contact(self, api_client):
        """OPTIONS preflight for /api/contact should return CORS headers"""
        headers = {
            "Origin": "https://rn-capital.preview.emergentagent.com",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type"
        }
        response = api_client.options(f"{BASE_URL}/api/contact", headers=headers)
        # Preflight should return 200 or 204
        assert response.status_code in [200, 204], f"Preflight failed: {response.status_code}"
        # Verify CORS headers present
        assert "access-control-allow-origin" in {k.lower() for k in response.headers.keys()}, \
            f"Missing Access-Control-Allow-Origin. Headers: {dict(response.headers)}"
        allow_methods = response.headers.get("access-control-allow-methods", "").upper()
        assert "POST" in allow_methods, f"POST not in allowed methods: {allow_methods}"

    def test_cors_preflight_options_login(self, api_client):
        """OPTIONS preflight for /api/auth/login"""
        headers = {
            "Origin": "https://rn-capital.preview.emergentagent.com",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type"
        }
        response = api_client.options(f"{BASE_URL}/api/auth/login", headers=headers)
        assert response.status_code in [200, 204]
        assert response.headers.get("access-control-allow-origin") is not None

    def test_cors_headers_on_normal_get(self, api_client):
        """Normal GET with Origin header should include CORS response headers"""
        headers = {"Origin": "https://rn-capital.preview.emergentagent.com"}
        response = api_client.get(f"{BASE_URL}/api/", headers=headers)
        assert response.status_code == 200
        # Verify CORS header is echoed back
        acao = response.headers.get("access-control-allow-origin")
        assert acao is not None, f"Missing ACAO header. Headers: {dict(response.headers)}"

    def test_cors_allow_credentials(self, api_client):
        """When allow_credentials=True, credentials header should be present"""
        headers = {"Origin": "https://rn-capital.preview.emergentagent.com"}
        response = api_client.get(f"{BASE_URL}/api/", headers=headers)
        assert response.status_code == 200
        allow_creds = response.headers.get("access-control-allow-credentials")
        # Starlette CORS: if allow_credentials=True, header will be 'true'
        # Note: With allow_origins=['*'] + allow_credentials=True, Starlette echoes the origin instead of '*'
        assert allow_creds == "true", f"Expected allow-credentials=true, got: {allow_creds}"

    def test_cors_env_variable_loaded(self):
        """Verify CORS_ORIGINS env variable is properly configurable"""
        # Read backend .env to confirm the value present
        env_path = Path("/app/backend/.env")
        content = env_path.read_text()
        assert "CORS_ORIGINS" in content, "CORS_ORIGINS should be defined in backend/.env"
