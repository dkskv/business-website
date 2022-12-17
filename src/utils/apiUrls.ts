import { environment } from 'src/environments/environment';

const { apiUrl: baseUrl } = environment;

export const apiUrls = {
  serviceRequest: `${baseUrl}/service-request`,
  services: `${baseUrl}/services`,
  benefits: `${baseUrl}/benefits`,
  serviceDeliveryStages: `${baseUrl}/service-delivery-stages`,
};
