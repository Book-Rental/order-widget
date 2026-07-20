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
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm max-md:p-4">

      <Rb_Text variant="h5">
        Need Help?
      </Rb_Text>

      <Rb_Text className="mt-2 text-gray-600">
        Facing an issue with this order? Our support team is here to help you.
      </Rb_Text>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
          <Rb_Text className="font-medium">
            Email:
          </Rb_Text>

          <Rb_Text className="break-all">
            {supportEmail}
          </Rb_Text>
        </div>

        <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
          <Rb_Text className="font-medium">
            Phone:
          </Rb_Text>

          <Rb_Text>
            {supportPhone}
          </Rb_Text>
        </div>

      </div>

      <div className="mt-6 flex gap-3 max-md:flex-col">

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