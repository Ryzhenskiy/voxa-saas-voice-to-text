const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      {children}
    </div>
  );
};

export default ClerkLayout;
