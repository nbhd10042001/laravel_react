import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";

export function FooterComponent() {
  const { showDialog } = useStateContext();
  return (
    <Footer container className="bg-dark-custom rounded-none">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex">
            <Footer.Brand
              src={`${
                import.meta.env.VITE_API_BASE_URL
              }/images/logo_company/logo3.png`}
              alt="MydemoApp Logo"
            />
            <span className="text-gray-50 font-medium text-lg">MydemoApp</span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" className="text-gray-50" />
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="https://flowbite.com/" target="_blanket">
                  Flowbite
                </Footer.Link>
                <Footer.Link href="https://tailwindcss.com/" target="_blanket">
                  Tailwind CSS
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-gray-50" />
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="https://github.com/" target="_blanket">
                  Github
                </Footer.Link>
                <Footer.Link href="https://discord.com/" target="_blanket">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-gray-50" />
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link
                  onClick={() => {
                    showDialog(true);
                  }}
                  className="hover:cursor-pointer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  onClick={() => {
                    showDialog(true);
                  }}
                  className="hover:cursor-pointer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="MyDemoApp™"
            year={2024}
            className="text-gray-50"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://facebook.com/"
              target="_blanket"
              icon={BsFacebook}
              className="text-gray-200 hover:opacity-70"
            />
            <Footer.Icon
              href="https://instagram.com/"
              target="_blanket"
              icon={BsInstagram}
              className="text-gray-200 hover:opacity-70"
            />
            <Footer.Icon
              href="https://x.com/"
              target="_blanket"
              icon={BsTwitter}
              className="text-gray-200 hover:opacity-70"
            />
            <Footer.Icon
              href="https://github.com/"
              target="_blanket"
              icon={BsGithub}
              className="text-gray-200 hover:opacity-70"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
