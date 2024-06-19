interface ModalHeaderProps {
  children: React.ReactNode;
}

const ModalHeader = ({ children }: ModalHeaderProps) => { 
  return <div>{children}</div>;
};

export { ModalHeader };