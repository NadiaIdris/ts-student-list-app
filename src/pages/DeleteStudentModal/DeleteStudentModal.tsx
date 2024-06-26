import { Form, Params, redirect, useLoaderData } from "react-router-dom";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { ModalBody } from "../../components/Modal/ModalBody";
import { ModalFooter } from "../../components/Modal/ModalFooter";
import { ModalHeader } from "../../components/Modal/ModalHeader";
import { ModalTitle } from "../../components/Modal/ModalHeader/ModalTitle";
import { IStudentFetchData } from "../StudentPanel";
import { axiosInstance } from "../../api/axiosConfig";
import { STUDENTS_ENDPOINT } from "../../api/apiConstants";

async function action({ params }: { params: Params }) {
  const studentId = params.studentId;
  try {
    const endpoint = STUDENTS_ENDPOINT + `/${studentId}`;
    const response = await axiosInstance.delete(endpoint);
    if (response.status === 200) {
      return redirect("/students");
    }
  } catch (error: any) {
    if (error.response.status === 404) {
      console.error("error msg inside delete action: ", error.response.data);
    }
    return null;
  }
}

const DeleteStudentModal = () => {
  const loaderData: IStudentFetchData | undefined = useLoaderData() as IStudentFetchData;
  const firstAndLastName = `${loaderData?.studentData?.firstName} ${loaderData?.studentData?.lastName}`;

  return (
    <Modal>
      <ModalHeader showCloseButton>
        <ModalTitle>Confirm</ModalTitle>
      </ModalHeader>
      <ModalBody>Are you sure you want to delete student {firstAndLastName}?</ModalBody>
      <ModalFooter>
        <Form method="delete">
          <Button type="submit" appearance="warning">
            Delete student {firstAndLastName}
          </Button>
        </Form>
      </ModalFooter>
    </Modal>
  );
};

export { DeleteStudentModal, action };
