import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <footer className="page-footer !bg-red-500">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Contesto</h5>
            <p className="grey-text text-lighten-4">
              &quot;Never Miss a Code Challenge&quot; <br /> <br />
              Contesto is a one-stop platform that aggregates upcoming
              competitive programming contests from all major platforms —
              including Codeforces, LeetCode, CodeChef, AtCoder, HackerRank, and
              more. Whether you&apos;re a beginner or a seasoned coder, Contesto
              helps you stay updated, plan ahead, and never miss a challenge.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Connect</h5>

            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/jeethendra2000"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <GitHubIcon fontSize="small" />
                  GitHub
                </a>
              </li>

              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.linkedin.com/in/jeethendra2000"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <LinkedInIcon fontSize="small" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="mailto:jeethendrajeethu8@gmail.com"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <EmailIcon fontSize="small" />
                  Gmail
                </a>
              </li>

              {/* <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.instagram.com/jeethendra_s_r/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <InstagramIcon fontSize="small" />
                  Instagram
                </a>
              </li> */}

              {/* <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://facebook.com/JeethendraSR"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FacebookIcon fontSize="small" />
                  Facebook
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          &copy; {new Date().getFullYear()} Copyright
          <a className="grey-text text-lighten-4 right" href="#!">
            More Links
          </a>
        </div>
      </div>
    </footer>
  );
}
