import { Form, useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/Modal/ModalHeader";
import { ModalTitle } from "../../components/Modal/ModalHeader/ModalTitle";
import { CgClose } from "react-icons/cg";
import { Button } from "../../components/Button";
import { ModalBody } from "../../components/Modal/ModalBody";

const AddStudentModal = () => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <Modal>
      <Form>
        <ModalHeader>
          <ModalTitle>Add a new student</ModalTitle>
          <Button
            type="button"
            onClick={closeModal}
            appearance="link-with-background"
            iconBefore={<CgClose style={{ width: "16px", height: "16px" }} />}
          />
        </ModalHeader>
        <ModalBody>
          <p>Form goes here</p>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export { AddStudentModal };
