import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export function FooterComponent() {
  return (
    <Footer container className="bg-dark-custom rounded-none">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex">
            <Footer.Brand
              src="https://flowbite.com/docs/images/logo.svg"
              alt="MydemoApp Logo"
            />
            <span className="text-gray-50 font-medium text-lg">MydemoApp</span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" className="text-gray-50"/>
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-gray-50"/>
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-gray-50"/>
              <Footer.LinkGroup col className="text-gray-400">
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Flowbite™" year={2022} className="text-gray-50"/>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-gray-200"/>
            <Footer.Icon href="#" icon={BsInstagram} className="text-gray-200"/>
            <Footer.Icon href="#" icon={BsTwitter} className="text-gray-200"/>
            <Footer.Icon href="#" icon={BsGithub} className="text-gray-200"/>
            <Footer.Icon href="#" icon={BsDribbble} className="text-gray-200"/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
