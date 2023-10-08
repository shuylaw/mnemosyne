import requests
import time


class JoplinBaseApi:
    """Base class for Joplin API to handle token and port discovery"""

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
                check_response = requests.get(
                    f"{self.base_url}/auth/check", params={"auth_token": auth_token}
                )
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
                if response.text == "JoplinClipperServer":
                    self.port = port
                    self.base_url = f"http://localhost:{self.port}"
                    print(f"Found Joplin API on port {self.port}")
                    break
            except requests.exceptions.RequestException:
                continue

    def validate_and_update_token(self):
        try:
            response = requests.get(
                f"{self.base_url}/notes", params={"token": self.token}
            )
            if response.status_code == 200:
                return True, "Token is valid"
            else:
                success, message = self.request_token()
                return success, message
        except requests.exceptions.RequestException as e:
            return False, str(e)


class JoplinNotesAPI(JoplinBaseApi):
    """Joplin API for notes"""

    def create_note(
        self,
        title,
        body=None,
        body_html=None,
        image_data_url=None,
        custom_id=None,
        **kwargs,
    ):
        payload = {"title": title}
        if body:
            payload["body"] = body
        if body_html:
            payload["body_html"] = body_html
        if image_data_url:
            payload["image_data_url"] = image_data_url
        if custom_id:
            payload["id"] = custom_id
        payload.update(kwargs)
        response = requests.post(
            f"{self.base_url}/notes", params={"token": self.token}, json=payload
        )
        return response.json()

    def get_note(self, note_id, fields=None):
        params = {"token": self.token}
        if fields:
            params["fields"] = ",".join(fields)
        response = requests.get(f"{self.base_url}/notes/{note_id}", params=params)
        return response.json()

    def update_note(self, note_id, **kwargs):
        payload = {}
        payload.update(kwargs)
        response = requests.put(
            f"{self.base_url}/notes/{note_id}",
            params={"token": self.token},
            json=payload,
        )
        return response.json()

    def delete_note(self, note_id):
        response = requests.delete(
            f"{self.base_url}/notes/{note_id}", params={"token": self.token}
        )
        return response.status_code == 204

    def search(self, query, item_type=None, fields=None):
        params = {"query": query, "token": self.token}
        if item_type:
            params["type"] = item_type
        if fields:
            params["fields"] = ",".join(fields)
        response = requests.get(f"{self.base_url}/search", params=params)
        return response.json()

    def fetch_all_notes(
        self, page=1, limit=10, order_by="updated_time", order_dir="ASC"
    ):
        notes = []
        while True:
            params = {
                "token": self.token,
                "page": page,
                "limit": limit,
                "order_by": order_by,
                "order_dir": order_dir,
            }
            response = requests.get(f"{self.base_url}/notes", params=params)
            data = response.json()
            notes.extend(data.get("items", []))
            if not data.get("has_more"):
                break
            page += 1
        return notes

    def get_note_tags(self, note_id):
        response = requests.get(
            f"{self.base_url}/notes/{note_id}/tags", params={"token": self.token}
        )
        return response.json()

    def get_note_resources(self, note_id):
        response = requests.get(
            f"{self.base_url}/notes/{note_id}/resources", params={"token": self.token}
        )
        return response.json()


class JoplinFoldersAPI(JoplinBaseApi):
    """Joplin API for folders / notebooks"""

    # TODO: Implement pagination if available for folders
    def get_all_folders(self):
        response = requests.get(
            f"{self.base_url}/folders", params={"token": self.token}
        )
        return response.json()

    def get_folder(self, folder_id):
        response = requests.get(
            f"{self.base_url}/folders/{folder_id}", params={"token": self.token}
        )
        return response.json()

    def get_notes_in_folder(self, folder_id):
        response = requests.get(
            f"{self.base_url}/folders/{folder_id}/notes", params={"token": self.token}
        )
        return response.json()

    def create_folder(self, title, **kwargs):
        payload = {"title": title}
        payload.update(kwargs)
        response = requests.post(
            f"{self.base_url}/folders", params={"token": self.token}, json=payload
        )
        return response.json()

    def update_folder(self, folder_id, **kwargs):
        payload = {}
        payload.update(kwargs)
        response = requests.put(
            f"{self.base_url}/folders/{folder_id}",
            params={"token": self.token},
            json=payload,
        )
        return response.json()

    def delete_folder(self, folder_id):
        response = requests.delete(
            f"{self.base_url}/folders/{folder_id}", params={"token": self.token}
        )
        return response.status_code == 204


class JoplinResourcesAPI(JoplinBaseApi):
    """
    Joplin Resources API Subclass
    """

    def get_all_resources(self):
        """
        Get all resources.

        Returns:
            dict: JSON response from the API.
        """
        response = requests.get(
            f"{self.base_url}/resources", params={"token": self.token}
        )
        return response.json()

    def get_resource(self, resource_id):
        """
        Get a specific resource by ID.

        Args:
            resource_id (str): The ID of the resource.

        Returns:
            dict: JSON response from the API.
        """
        response = requests.get(
            f"{self.base_url}/resources/{resource_id}", params={"token": self.token}
        )
        return response.json()

    def get_resource_file(self, resource_id):
        """
        Get the actual file associated with a resource.

        Args:
            resource_id (str): The ID of the resource.

        Returns:
            bytes: The file content.
        """
        response = requests.get(
            f"{self.base_url}/resources/{resource_id}/file",
            params={"token": self.token},
        )
        return response.content

    def get_resource_notes(self, resource_id):
        """
        Get the notes associated with a resource.

        Args:
            resource_id (str): The ID of the resource.

        Returns:
            dict: JSON response from the API.
        """
        response = requests.get(
            f"{self.base_url}/resources/{resource_id}/notes",
            params={"token": self.token},
        )
        return response.json()

    def create_resource(self, file_path, title=None):
        """
        Create a new resource.

        Args:
            file_path (str): The path to the file to upload.
            title (str, optional): The title of the resource.

        Returns:
            dict: JSON response from the API.
        """
        with open(file_path, "rb") as f:
            files = {"data": f}
            if title:
                props = {"title": title}
                response = requests.post(
                    f"{self.base_url}/resources",
                    params={"token": self.token},
                    files=files,
                    data={"props": json.dumps(props)},
                )
            else:
                response = requests.post(
                    f"{self.base_url}/resources",
                    params={"token": self.token},
                    files=files,
                )
        return response.json()

    def update_resource(self, resource_id, file_path=None, **kwargs):
        """
        Update a resource.

        Args:
            resource_id (str): The ID of the resource.
            file_path (str, optional): The path to the new file to upload.
            **kwargs: Additional properties to update.

        Returns:
            dict: JSON response from the API.
        """
        if file_path:
            with open(file_path, "rb") as f:
                files = {"data": f}
                response = requests.put(
                    f"{self.base_url}/resources/{resource_id}",
                    params={"token": self.token},
                    files=files,
                    data={"props": json.dumps(kwargs)},
                )
        else:
            response = requests.put(
                f"{self.base_url}/resources/{resource_id}",
                params={"token": self.token},
                json=kwargs,
            )
        return response.json()

    def delete_resource(self, resource_id):
        """
        Delete a resource.

        Args:
            resource_id (str): The ID of the resource.

        Returns:
            bool: True if the resource was deleted successfully, False otherwise.
        """
        response = requests.delete(
            f"{self.base_url}/resources/{resource_id}", params={"token": self.token}
        )
        return response.status_code == 204
