type BottomNavProps = {
  children: React.ReactNode;
};

const BottomNav = ({ children }: BottomNavProps) => {
  return (
    <nav className="h-14 xs:h-16 w-full text-sm fixed bottom-0 left-0 bg-gray-light flex justify-around align-middle">
      {children}
    </nav>
  );
};

export default BottomNav;
