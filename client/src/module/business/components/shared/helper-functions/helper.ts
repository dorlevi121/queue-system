import { Service } from "../../../../../models/system/service"

export const findServiceById = (services: Service[], serviceId: string) => {
    return services.find(s => s._id === serviceId);
}