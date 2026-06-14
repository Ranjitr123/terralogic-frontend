import type { ClientSectionImages } from "@/types/home";

type Props = {
  clientContent?: string;
  clientSectionImages?: ClientSectionImages[];
};

/** Replaces index.php client_content + client_section_images */
export default function ClientsSection({ clientContent, clientSectionImages }: Props) {
  if (!clientContent && !clientSectionImages?.length) return null;

  return (
    <section className="home-section home-section--clients">
      <h2 className="home-section__title home-section__title--light">{clientContent}</h2>
      <div className="home-clients">
        {clientSectionImages?.map((group, gIdx) =>
          group.client_image?.map((row, rIdx) => (
            <img
              key={`${gIdx}-${rIdx}`}
              src={row.images}
              alt="Client logo"
              className="home-clients__logo"
            />
          ))
        )}
      </div>
    </section>
  );
}
