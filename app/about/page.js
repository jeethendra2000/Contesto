import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="mx-auto max-w-3xl">
        <section className="rounded-3xl bg-slate-50 p-6 text-center shadow-sm ring-1 ring-slate-200 sm:p-10">
          {/* Profile Image */}
          <div className="flex justify-center">
            <Image
              src="/JeethendraSR.jpg"
              alt="Jeethendra profile"
              width={140}
              height={140}
              className="rounded-full object-cover ring-4 ring-slate-200 shadow-md"
            />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold text-slate-900">
            Jeethendra S R
          </h1>
          <h4 className="mt-5 text-4xl font-bold text-slate-600">
            Software Engineer
          </h4>

          {/* Description */}
          <div className="mt-6 space-y-4 text-left text-slate-700 leading-7">
            <p>
              I'm a passionate, results-driven Software Engineer with 4+ years
              of experience in designing and developing full-stack applications,
              specializing in modern web technologies and cloud-based enterprise
              solutions. My expertise lies in backend development, plugin
              customization, and delivering enterprise-grade solutions.
            </p>

            <p>
              Currently working at Kerv Digital, responsible for building
              scalable web and cloud applications with custom client solutions
              that integrate cloud platforms, business applications using .NET,
              Azure, Dynamics CRM with proven ability to collaborate effectively
              in Agile teams, and deliver impactful features for business
              clients.
            </p>

            <p>
              I’m a quick learner who enjoys solving real-world challenges with
              clean, maintainable code and delivering meaningful user
              experiences at scale.
            </p>
          </div>
          <div className="flex gap-4 items-center flex-col justify-center sm:flex-row">
            <Image
              src="/confess.png"
              alt="Vercel logomark"
              width={200}
              height={200}
            />
          </div>
        </section>
        {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Image
            className="dark"
            src="https://drive.google.com/uc?id=1PlQnQUUln6yUZLPsKnYChjSZeE-7oVO1&export=download"
            alt="Vercel logomark"
            width={2000}
            height={2000}
          />
        </div> */}
      </main>
    </div>
  );
}
{
  /* <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Image
            className="dark"
            src="https://drive.google.com/uc?id=1PlQnQUUln6yUZLPsKnYChjSZeE-7oVO1&export=download"
            alt="Vercel logomark"
            width={2000}
            height={2000}
          />
        </div> */
}
