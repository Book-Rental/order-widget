import { Rb_Button, Rb_Text } from "@rentbook/rentbook-ui-lib";

interface HelpSectionProps {
  supportEmail?: string;
  supportPhone?: string;
}

const HelpSection = ({
  supportEmail = "support@rentbook.com",
  supportPhone = "+91 98765 43210",
}: HelpSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-xl rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm max-md:p-4">
      {/* Heading */}
      <Rb_Text
        variant="h5"
        className="text-base font-semibold leading-6 text-gray-900"
      >
        Need Help?
      </Rb_Text>

      {/* Description */}
      <Rb_Text className="mt-2 text-sm leading-5 text-gray-600">
        Facing an issue with this order? Our support team is here to help you.
      </Rb_Text>

      {/* Contact Information */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-start gap-2 max-md:flex-col max-md:items-start">
          <Rb_Text className="text-sm font-medium leading-5 text-gray-900">
            Email:
          </Rb_Text>

          <Rb_Text className="break-all text-sm leading-5 text-gray-600">
            {supportEmail}
          </Rb_Text>
        </div>

        <div className="flex items-center justify-start gap-2 max-md:flex-col max-md:items-start">
          <Rb_Text className="text-sm font-medium leading-5 text-gray-900">
            Phone:
          </Rb_Text>

          <Rb_Text className="text-sm leading-5 text-gray-600">
            {supportPhone}
          </Rb_Text>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-start gap-3 max-md:flex-col sm:justify-center">
        <Rb_Button className="max-md:w-full">
          Contact Support
        </Rb_Button>

        <Rb_Button
          variant="secondary"
          className="max-md:w-full"
        >
          Raise an Issue
        </Rb_Button>
      </div>
    </section>
  );
};

export default HelpSection;