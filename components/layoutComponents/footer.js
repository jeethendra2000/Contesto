export default function Footer() {
  return (
    <footer className="page-footer !bg-red-500">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Contesto</h5>
            <p className="grey-text text-lighten-4">
              "Never Miss a Code Challenge" <br /> <br />
              Contesto is a one-stop platform that aggregates upcoming
              competitive programming contests from all major platforms —
              including Codeforces, LeetCode, CodeChef, AtCoder, HackerRank, and
              more. Whether you're a beginner or a seasoned coder, Contesto
              helps you stay updated, plan ahead, and never miss a challenge.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Connect</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Whatsapp
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Facebok
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Copyright
          <a className="grey-text text-lighten-4 right" href="#!">
            More Links
          </a>
        </div>
      </div>
    </footer>
  );
}
