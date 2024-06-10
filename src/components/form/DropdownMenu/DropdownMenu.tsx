interface DropdownMenuProps {
  options: string[];
  onSelect: (option: string) => void;
  
};

const DropdownMenu = ({ options, onSelect }: DropdownMenuProps) => { 
  return (<div>DropdownMenu</div>);
};

export { DropdownMenu };