import type { AcfImage } from "@/lib/acf-helpers";

/** Response from POST /wp-json/api/pages/home */
export interface HeadlessApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface HeroBannerSlide {
  heading?: string;
  sub_heading?: string;
  description?: string;
  image?: string;
  cta_text?: string;
  cta_url?: string;
}

export interface HeroBanner {
  layout?: string;
  sliders?: HeroBannerSlide[];
}

export interface ServiceCardItem {
  icon?: string;
  image?: string;
  title?: string;
  description?: string;
  content?: string;
  cta_text?: string;
  cta_url?: string;
  cta_icon?: string;
  button_name?: string;
  button_link?: string;
}

export interface ServicesBlock {
  layout?: string;
  title?: string;
  heading?: string;
  sub_heading?: string;
  service_subheading?: string;
  service_cards?: ServiceCardItem[];
  cards_section?: ServiceCardItem[];
  cards?: ServiceCardItem[];
}

/** Page sections returned by the headless API (extend as backend adds layouts) */
export interface HomePageData {
  hero_banner?: HeroBanner;
  slider_service?: ServicesBlock;
  our_services?: ServicesBlock;
}

export interface ServiceCard {
  image?: AcfImage;
  title?: string;
  content?: string;
  button_name?: string;
  button_link?: string;
}

export interface SliderService {
  heading?: string;
  service_subheading?: string;
  cards_section?: ServiceCard[];
}

export interface TechCard {
  image?: AcfImage;
  section_heading?: string;
  section_content?: string;
}

export interface TechnologiesSection {
  heading?: string;
  section_cards?: TechCard[];
}

export interface RecognitionItem {
  image?: AcfImage;
  content?: string;
  button_text?: string;
  button_link?: string;
}

export interface ClientImage {
  images?: string;
}

export interface ClientSectionImages {
  client_image?: ClientImage[];
}

export interface WorksSection {
  heading?: string;
  sub_heading?: string;
}

export interface IconSection {
  image?: AcfImage;
  title?: string;
  content?: string;
}

export interface TestimonialHeader {
  heading?: string;
  sub_heading?: string;
  content?: string;
}

export interface SliderTestimonial {
  avatar?: AcfImage;
  company_logo?: AcfImage;
  name?: string;
  designation?: string;
  company?: string;
  service_heading?: string;
  content?: string;
}

export interface ApproachContent {
  main_heading?: string;
  sub_heading?: string;
}

export interface OurApproachItem {
  image?: AcfImage;
  content_heading?: string;
  descriptions?: string;
}

export interface XenwingoContent {
  small_image?: AcfImage;
  image?: AcfImage;
  descriptions?: string;
  button_text?: string;
  button_link?: string;
}

export interface AboutContent {
  heading?: string;
  sub_heading?: string;
  descriptions?: string;
  button_text?: string;
  button_link?: string;
}
