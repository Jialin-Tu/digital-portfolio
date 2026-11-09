export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#166534" }}
      className="py-6"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-white text-sm">
            © {currentYear} Jialin Tu. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
