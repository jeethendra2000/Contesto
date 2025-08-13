
import Image from "next/image";

export default function About() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Image
              className="dark"
              src="https://drive.google.com/uc?id=1PlQnQUUln6yUZLPsKnYChjSZeE-7oVO1&export=download"
              alt="Vercel logomark"
              width={2000}
              height={2000}
            />
        </div>
      </main>
    </div>
  );
}
