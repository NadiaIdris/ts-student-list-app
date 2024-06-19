interface ModalTitleProps {
  children: React.ReactNode;
}

const ModalTitle = ({ children }: ModalTitleProps) => { 
  return <div>{children}</div>;
};

export { ModalTitle };