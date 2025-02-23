import UpdateProfileForm from "./_components/update-profile";
import ChangePasswordForm from "./_components/change-password-form";
import ChangeEmailForm from "./_components/change-email-form";

const Controlpanel = () => {
  return (
    <section className="flex flex-col justify-between gap-6 h-full md:p-0 p-4">
      <UpdateProfileForm/>
      <ChangePasswordForm/>
      <ChangeEmailForm/>
    </section>
  );
};

export default Controlpanel;
