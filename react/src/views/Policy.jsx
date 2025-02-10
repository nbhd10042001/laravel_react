import React from "react";
import PageComponent from "../components/PageComponent";

export default function Policy() {
  const date = new Date().toLocaleString();
  return (
    <PageComponent title={"Fake Privacy Policy"}>
      <div className="mx-12">
        <div className="flex flex-col text-sm mb-6 italic">
          <span>Effective Date: {date}</span>
          <span>Last Updated: {date}</span>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-lg font-medium">1. Introduction</h1>
            <p>
              Welcome to [Your Website Name] (“we,” “our,” or “us”). We take
              your privacy seriously, even if we don’t really collect any data.
              This Privacy Policy outlines how we may (or may not) collect, use,
              and protect your personal information while you browse our
              website.
            </p>
          </div>
          <div>
            <h1 className="text-lg font-medium">
              2. Information We May or May Not Collect
            </h1>
            <p>We may or may not collect the following types of information:</p>
            <ul class="list-disc text-left list-inside">
              <li>
                Personal Data: Your name, email address, and other details you
                voluntarily provide.
              </li>
              <li>
                Non-Personal Data: Random browser info, IP addresses (but we
                probably won’t look at them)
              </li>
              <li>Cookies: We use cookies, but only the delicious kind</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-medium">
              3. How We Use Your Data (If We Actually Have Any)
            </h1>
            <p>
              Any data we collect (if any) might be used for the following
              purposes:
            </p>
            <ul class="list-disc text-left list-inside">
              <li>To pretend we have an analytics system.</li>
              <li>To give an illusion of a sophisticated user experience.</li>
              <li>To make our website look more professional.</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-medium">
              4. Third-Party Sharing (Which Probably Won’t Happen)
            </h1>
            <p>We may or may not share your data with:</p>
            <ul class="list-disc text-left list-inside">
              <li>Imaginary marketing partners.</li>
              <li>Government agencies (only if they bribe us with pizza).</li>
              <li>Hackers (just kidding… or are we?).</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-medium">5. Data Security (Sort Of)</h1>
            <p>
              We implement the best security practices we can Google in five
              minutes. However, we can’t guarantee 100% safety because even
              top-tier companies get hacked.
            </p>
          </div>
          <div>
            <h1 className="text-lg font-medium">6. Contact Us</h1>
            <p>
              If you have any questions, concerns, or just want to say hi, reach
              out to us at{" "}
              <span className="font-meidum text-indigo-700">
                example@gmail.com
              </span>{" "}
              (but we might not reply).
            </p>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
