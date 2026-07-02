# Backend API Integration and CRUD tests for RN Business Management Portal
import pytest
import requests
import os
from pathlib import Path

# Load env variables if not set
if not os.environ.get('REACT_APP_BACKEND_URL'):
    # Try reading from frontend/.env
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
    """Shared requests session with standard headers"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session

@pytest.fixture
def admin_credentials():
    """Returns valid admin credentials"""
    return {
        "email": "rafael.norat@rnbusiness.com",
        "password": "RN_Admin_2026!"
    }

class TestPublicEndpoints:
    """Tests for public API endpoints including contact submissions and newsletter signups"""

    def test_health_check(self, api_client):
        """Verify the backend health check and root endpoint returns branding info"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "brand" in data
        assert data["brand"] == "RN Business Management"

    def test_contact_submission_success(self, api_client):
        """Create a contact submission and verify response data structure"""
        payload = {
            "name": "TEST_John Doe",
            "email": "test_john@example.com",
            "what_are_you_working_on": "I am working on a 15-unit portfolio expansion."
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code in [200, 201]
        
        data = response.json()
        assert "id" in data or "_id" in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"].lower()
        assert data["what_are_you_working_on"] == payload["what_are_you_working_on"]
        assert data["status"] == "new"

    def test_waitlist_signup_success(self, api_client):
        """Verify that a waitlist registration persists and returns correct payload"""
        payload = {
            "name": "TEST_Jane Waitlist",
            "email": "test_jane@example.com",
            "source": "financial-clarity-tool"
        }
        response = api_client.post(f"{BASE_URL}/api/waitlist", json=payload)
        assert response.status_code in [200, 201]
        
        data = response.json()
        assert "id" in data or "_id" in data
        assert data["email"] == payload["email"].lower()
        assert data["source"] == payload["source"]


class TestAdminSecurity:
    """Security tests verifying that restricted resources are indeed protected"""

    def test_admin_endpoints_unauthorized(self, api_client):
        """Attempt to access secure endpoints without credentials and expect 401/403"""
        resp_sub = api_client.get(f"{BASE_URL}/api/admin/submissions")
        assert resp_sub.status_code in [401, 403]

        resp_wl = api_client.get(f"{BASE_URL}/api/admin/waitlist")
        assert resp_wl.status_code in [401, 403]

    def test_login_invalid_credentials(self, api_client):
        """Verify login fails with wrong credentials"""
        payload = {
            "email": "rafael.norat@rnbusiness.com",
            "password": "WrongPassword123!"
        }
        response = api_client.post(f"{BASE_URL}/api/auth/login", json=payload)
        assert response.status_code in [401, 403]


class TestAdminOperations:
    """Authenticated operations: login, data viewing, status updating, and item deletion"""

    @pytest.fixture
    def auth_session(self, api_client, admin_credentials):
        """Login and return a session holding authenticated cookies / headers"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json=admin_credentials)
        if response.status_code != 200:
            pytest.skip("Auth login failed - skipping administrative tests")
        
        # Access token could be returned in json body or cookie
        data = response.json()
        token = data.get("access_token")
        if token:
            api_client.headers.update({"Authorization": f"Bearer {token}"})
        
        return api_client

    def test_auth_me(self, auth_session, admin_credentials):
        """Check /auth/me returns the correct authenticated user profile"""
        response = auth_session.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == admin_credentials["email"]
        assert data["role"] == "admin"

    def test_submissions_crud_and_status_update_cycle(self, auth_session):
        """Verify the full operational lifecycle of a contact submission"""
        # 1. CREATE a test submission via public route
        create_payload = {
            "name": "TEST_Lifecycle Sub",
            "email": "test_lifecycle@example.com",
            "what_are_you_working_on": "Operational friction in property management."
        }
        create_resp = auth_session.post(f"{BASE_URL}/api/contact", json=create_payload)
        assert create_resp.status_code in [200, 201]
        created_id = create_resp.json().get("id") or create_resp.json().get("_id")
        assert created_id is not None

        # 2. READ submissions and verify test submission is in list
        get_resp = auth_session.get(f"{BASE_URL}/api/admin/submissions")
        assert get_resp.status_code == 200
        submissions = get_resp.json()
        assert len(submissions) > 0
        
        found_sub = next((s for s in submissions if s.get("id") == created_id or s.get("_id") == created_id), None)
        assert found_sub is not None
        assert found_sub["name"] == create_payload["name"]
        assert found_sub["status"] == "new"

        # 3. UPDATE status of the submission
        update_payload = {"status": "in-progress"}
        patch_resp = auth_session.patch(f"{BASE_URL}/api/admin/submissions/{created_id}", json=update_payload)
        assert patch_resp.status_code == 200

        # Verify change persisted by getting list again
        get_resp_updated = auth_session.get(f"{BASE_URL}/api/admin/submissions")
        updated_sub = next((s for s in get_resp_updated.json() if s.get("id") == created_id or s.get("_id") == created_id), None)
        assert updated_sub is not None
        assert updated_sub["status"] == "in-progress"

        # 4. DELETE the submission
        delete_resp = auth_session.delete(f"{BASE_URL}/api/admin/submissions/{created_id}")
        assert delete_resp.status_code == 200

        # Verify removal
        get_resp_final = auth_session.get(f"{BASE_URL}/api/admin/submissions")
        deleted_sub = next((s for s in get_resp_final.json() if s.get("id") == created_id or s.get("_id") == created_id), None)
        assert deleted_sub is None

    def test_waitlist_crud_and_delete_cycle(self, auth_session):
        """Verify the full lifecycle of a waitlist subscription"""
        # 1. CREATE waitlist entry via public route
        create_payload = {
            "name": "TEST_Lifecycle Waitlist",
            "email": "test_lifecycle_wl@example.com",
            "source": "podcast"
        }
        create_resp = auth_session.post(f"{BASE_URL}/api/waitlist", json=create_payload)
        assert create_resp.status_code in [200, 201]
        created_id = create_resp.json().get("id") or create_resp.json().get("_id")
        assert created_id is not None

        # 2. READ waitlist and verify it exists
        get_resp = auth_session.get(f"{BASE_URL}/api/admin/waitlist")
        assert get_resp.status_code == 200
        waitlists = get_resp.json()
        assert len(waitlists) > 0

        found_wl = next((w for w in waitlists if w.get("id") == created_id or w.get("_id") == created_id), None)
        assert found_wl is not None
        assert found_wl["email"] == create_payload["email"].lower()

        # 3. DELETE the waitlist entry
        delete_resp = auth_session.delete(f"{BASE_URL}/api/admin/waitlist/{created_id}")
        assert delete_resp.status_code == 200

        # Verify removal
        get_resp_final = auth_session.get(f"{BASE_URL}/api/admin/waitlist")
        deleted_wl = next((w for w in get_resp_final.json() if w.get("id") == created_id or w.get("_id") == created_id), None)
        assert deleted_wl is None

    def test_logout(self, auth_session):
        """Verify logout invalidates cookie/session and clearing the Bearer token blocks access"""
        logout_resp = auth_session.post(f"{BASE_URL}/api/auth/logout")
        assert logout_resp.status_code == 200
        
        # Clear the Authorization header to test that the cookie alone is either deleted or doesn't authorize us
        auth_session.headers.pop("Authorization", None)
        
        # Verify accessing secure route now fails
        me_resp = auth_session.get(f"{BASE_URL}/api/auth/me")
        assert me_resp.status_code in [401, 403]
