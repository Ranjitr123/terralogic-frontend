import type { AcfImage } from "@/lib/acf-helpers";

/** Mirrors ACF fields used in wp-content/themes/terralogic/index.php */

export interface BannerSlide {
  heading?: string;
  description?: string;
  button_name?: string;
  button_link?: string;
  image?: AcfImage;
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

export interface HomeAcf {
  banner_slider?: BannerSlide[];
  slider_service?: SliderService[];
  technologies_section?: TechnologiesSection[];
  awards_heading?: string;
  recognition?: RecognitionItem[];
  client_content?: string;
  client_section_images?: ClientSectionImages[];
  works?: WorksSection[];
  workimage?: AcfImage;
  icon_sections?: IconSection[];
  testimonial?: TestimonialHeader[];
  slider_testimonial?: SliderTestimonial[];
  approach_content?: ApproachContent[];
  our_approach?: OurApproachItem[];
  xenwingo_content?: XenwingoContent[];
  content?: AboutContent[];
}

export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: HomeAcf;
  yoast_head_json?: {
    title?: string;
    description?: string;
  };
}
