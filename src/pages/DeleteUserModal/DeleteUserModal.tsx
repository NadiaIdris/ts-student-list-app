import { Form, Params, redirect, useActionData, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { ModalBody } from "../../components/Modal/ModalBody";
import { ModalFooter } from "../../components/Modal/ModalFooter";
import { ModalHeader } from "../../components/Modal/ModalHeader";
import { ModalTitle } from "../../components/Modal/ModalHeader/ModalTitle";
import { useAuthContext } from "../../hooks/useAuthContext";
import { axiosInstance } from "../../api/axiosConfig";
import { USER_ENDPOINT } from "../../api/apiConstants";
import { useEffect } from "react";

interface IDeleteUser {
  logUserOut: boolean;
}

async function action({ params }: { params: Params }) {
  const userId = params.userId;
  try {
    // Delete the user from the database.
    const deleteUserEndpoint = USER_ENDPOINT + `/${userId}/delete`;
    const response = await axiosInstance.delete(deleteUserEndpoint);
    if (response.status === 200) {
      // Call logout function to clear the user data from the context.
      return { logUserOut: true };
    }
  } catch (error: any) {
    if (error.response.status === 404) {
      console.error(`[ACTION ERROR]: ${error}`);
    }
    console.error(error.message);
  }
  return null;
}

const DeleteUserModal = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuthContext();
  const actionData: IDeleteUser | null = useActionData() as IDeleteUser;

  useEffect(() => {
    if (actionData?.logUserOut) {
      logOut();
      navigate("/signup", { replace: true });
    }
  });

  return (
    <Modal>
      <ModalHeader showCloseButton>
        <ModalTitle>Confirm</ModalTitle>
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete your account, {user?.firstName} {user?.lastName}?
      </ModalBody>
      <ModalFooter>
        <Form method="post">
          <Button type="submit" appearance="warning">
            Delete my account
          </Button>
        </Form>
      </ModalFooter>
    </Modal>
  );
};

export { DeleteUserModal, action };
