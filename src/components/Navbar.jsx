import { useState, useEffect } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Menu", id: "menu" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.8rem 1.5rem",
        backgroundColor: isScrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.8)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(198,164,63,0.2)",
        transition: "all 0.3s ease"
      }}>
        {/* Logo */}
        <div
          className="logo"
          onClick={() => scrollToSection("home")}
          style={{
            fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
            fontWeight: "800",
            cursor: "pointer",
            transition: "opacity 0.3s"
          }}
        >
          velv<span style={{ color: "#C6A43F" }}>et</span>
        </div>

        {/* Desktop Menu */}
        <div style={{
          display: "flex",
          gap: "clamp(1rem, 2vw, 2rem)",
          alignItems: "center"
        }} className="desktop-menu">
          {navItems.map((item) => (
            <a
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              style={{
                color: "#F7F5F0",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "color 0.3s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={e => e.target.style.color = "#C6A43F"}
              onMouseLeave={e => e.target.style.color = "#F7F5F0"}
            >
              {item.name}
            </a>
          ))}
          <div onClick={() => scrollToSection("contact")}>
            <Button variant="primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
              Reserve →
            </Button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            cursor: "pointer",
            zIndex: 101,
            padding: "10px"
          }}
        >
          <span style={{ width: "24px", height: "2px", background: "#F7F5F0", transition: "0.3s" }}></span>
          <span style={{ width: "24px", height: "2px", background: "#F7F5F0", transition: "0.3s" }}></span>
          <span style={{ width: "24px", height: "2px", background: "#F7F5F0", transition: "0.3s" }}></span>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </nav>

      {/* Mobile Fullscreen Menu — rendered OUTSIDE <nav> so it is not
          trapped inside nav's stacking context and can cover everything */}
      {isMenuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0A0A0A",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          animation: "fadeIn 0.3s ease"
        }}>
          {/* Close button */}
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#C6A43F",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "rgba(198,164,63,0.1)"
            }}
          >
            ✕
          </div>

          {/* All 5 navigation links */}
          {navItems.map((item) => (
            <a
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              style={{
                color: "#F7F5F0",
                textDecoration: "none",
                fontSize: "2rem",
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                transition: "color 0.3s",
                padding: "0.5rem"
              }}
              onMouseEnter={e => e.target.style.color = "#C6A43F"}
              onMouseLeave={e => e.target.style.color = "#F7F5F0"}
            >
              {item.name}
            </a>
          ))}

          {/* Reserve button */}
          <div onClick={() => scrollToSection("contact")} style={{ marginTop: "1rem" }}>
            <Button variant="primary" style={{ padding: "0.8rem 2rem", fontSize: "1rem" }}>
              Reserve a table →
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;