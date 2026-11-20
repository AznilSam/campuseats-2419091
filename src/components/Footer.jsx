// Footer: shows a JavaScript expression (the current year) inside JSX.
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CampusEats &middot; BICS 3301, IIUM</p>
    </footer>
  )
}

export default Footer
