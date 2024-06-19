interface ModalFooterProps { 
  children: React.ReactNode;
};

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div>{children}</div>;
};

export { ModalFooter };