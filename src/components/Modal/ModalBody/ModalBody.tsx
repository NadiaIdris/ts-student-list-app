interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return <div>{children}</div>;
};

export { ModalBody };
