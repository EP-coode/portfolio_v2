type BottomNavProps = {
  children: React.ReactNode;
};

const BottomNav = ({ children }: BottomNavProps) => {
  return (
    <nav className="h-16 w-full sticky bottom-0 left-0 bg-slate-700 flex justify-around align-middle p-2 min-w-fit">
      {children}
    </nav>
  );
};

export default BottomNav;
