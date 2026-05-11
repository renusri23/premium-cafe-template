import { useState, useEffect } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: isScrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.8)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid rgba(198,164,63,0.2)",
      transition: "all 0.3s ease"
    }}>
      <div 
        className="logo" 
        onClick={() => scrollToSection("home")}
        style={{ 
          fontSize: "clamp(1.5rem, 4vw, 2rem)", 
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
        gap: "2rem",
        alignItems: "center"
      }} className="desktop-menu">
        {["Home", "About", "Menu", "Gallery", "Testimonials", "Contact"].map((item) => (
          <a
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            style={{
              color: "#F7F5F0",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "color 0.3s"
            }}
            onMouseEnter={e => e.target.style.color = "#C6A43F"}
            onMouseLeave={e => e.target.style.color = "#F7F5F0"}
          >
            {item}
          </a>
        ))}
        <div onClick={() => scrollToSection("contact")}>
          <Button variant="primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem" }}>
            Reserve →
          </Button>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div 
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          flexDirection: "column",
          gap: "6px",
          cursor: "pointer",
          zIndex: 101
        }}
      >
        <span style={{ width: "25px", height: "2px", background: "#F7F5F0", transition: "0.3s" }}></span>
        <span style={{ width: "25px", height: "2px", background: "#F7F5F0", transition: "0.3s" }}></span>
        <span style={{ width: "25px", height: "2px", background: "#F7F5F0", transition: "0.3s" }}></span>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0A0A0A",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem"
        }}>
          {["Home", "About", "Menu", "Gallery", "Testimonials", "Contact"].map((item) => (
            <a
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              style={{
                color: "#F7F5F0",
                textDecoration: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif"
              }}
            >
              {item}
            </a>
          ))}
          <div onClick={() => scrollToSection("contact")}>
            <Button variant="primary">Reserve →</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;