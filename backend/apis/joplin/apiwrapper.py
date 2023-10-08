import requests
import time

class JoplinBaseApi:
    def __init__(self, token, port=41184):
        self.token = token
        self.port = port
        self.base_url = f"http://localhost:{self.port}"
        
    def request_token(self):
        try:
            # Step 1: Initiate the auth request
            response = requests.post(f"{self.base_url}/auth")
            auth_token = response.json().get("auth_token")

            if not auth_token:
                return False, "Failed to get auth_token"

            # Step 2: Poll for user acceptance
            while True:
                check_response = requests.get(f"{self.base_url}/auth/check", params={"auth_token": auth_token})
                status = check_response.json().get("status")

                if status == "waiting":
                    time.sleep(2)  # Wait for 2 seconds before polling again
                elif status == "accepted":
                    self.token = check_response.json().get("token")
                    return True, "Token accepted and updated"
                elif status == "rejected":
                    return False, "Token request rejected by user"
                else:
                    return False, "Unknown status"

        except requests.exceptions.RequestException as e:
            return False, str(e)
        
    def discover_port(self):
        for port in range(41184, 41195):
            try:
                response = requests.get(f"http://localhost:{port}/ping")
                if response.text == 'JoplinClipperServer':
                    self.port = port
                    self.base_url = f"http://localhost:{self.port}"
                    print(f"Found Joplin API on port {self.port}")
                    break
            except requests.exceptions.RequestException:
                continue
            
    def validate_and_update_token(self):
        try:
            response = requests.get(f"{self.base_url}/notes", params={"token": self.token})
            if response.status_code == 200:
                return True, "Token is valid"
            else:
                success, message = self.request_token()
                return success, message
        except requests.exceptions.RequestException as e:
            return False, str(e)