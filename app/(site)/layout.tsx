import Navbar from "@/components/navbar";

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default SiteLayout;
