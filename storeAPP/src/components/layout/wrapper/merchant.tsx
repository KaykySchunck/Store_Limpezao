import { Menu } from "./menu";
import { HeaderComponent } from "./header";

type Props = {
  merchantId: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  action?: React.ReactNode;
};
export function MerchantComponent({
  merchantId,
  children,
  sidebar,
  action,
}: Props) {
  return (
    <div className="flex min-h-screen w-full mx-auto 2xl:w-full 2xl:max-w-screen-2xl">
      <div className="flex flex-1 flex-col">
        <HeaderComponent merchantId={merchantId} />
        <div className="flex h-full">
          <main className="flex flex-1 flex-col gap-6 px-6 pb-6 max-w-custom">
            <Menu merchantId={merchantId} action={action} />
            {children}
          </main>
          {sidebar && <div className="hidden xl:flex">{sidebar}</div>}
        </div>
      </div>
    </div>
  );
}
