import React, { useState } from 'react';
import SerivcesSettingsStyle from './services.module.scss';
import SettingsHeader from '../../shared/header/settings-header.shared';
import { Service } from '../../../../../models/system/service';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Button from '../../../../../models/ui/button/button';
import Breadcrumbs from '../../../../../models/ui/breadcrumbs/breadcrumbs';
import AddService from './components/add-service/add-service.services';
import { ArrowNext } from '../../../../../assets/icons/icons';

export default function SerivcesSettings() {
    const [Categories, setCategories] = useState(['תספורת', 'צבע', 'חפיפה']);
    const [Services, setServices] = useState<Service[]>([
        {
            id: '1',
            category: 'תספורת',
            title: 'תספורת גבר',
            price: 40,
            duration: 20,
            available: false
        },
        {
            id: '2',
            category: 'תספורת',
            title: 'תספורת אישה',
            price: 60,
            duration: 40,
            available: true
        },
        {
            id: '3',
            category: 'צבע',
            title: 'צבע אישה',
            price: 120,
            duration: 50,
            available: true
        },
        {
            id: '4',
            category: 'חפיפה',
            title: 'חפיפה',
            price: 20,
            duration: 5,
            available: true
        },
        {
            id: '5',
            category: 'חפיפה',
            title: 'חפיפה מושקעת',
            price: 40,
            duration: 70,
            available: true
        },

    ]);
    const [ServiceToUpdate, setServiceToUpdate] = useState<Service | null>(null)
    const [Modal, setModal] = useState(false);

    const addNewService = (service: Service) => {

            if (service.id) {
                const s = Services.find(s => s.id === service.id);
                if (s === undefined) return;
                s.category = service.category;
                s.duration = service.duration;
                s.price = service.price;
                s.title = service.title;
                s.available = service.available;
                setServiceToUpdate(null)
            }
            else {
                const services = [...Services];
                services.push(service);
                setServices(services);
            }
            setModal(false)
        
    }

    const deleteService = (service: Service) => {
    }

    const updateService = (service: Service) => {
        if (Services.find(s => s.id === service.id)) {
            setServiceToUpdate(service);
            setModal(true)
        }
    }

    if (!Modal && ServiceToUpdate) setServiceToUpdate(null);

    return (
        <React.Fragment>
            {Modal && <AddService close={() => setModal(false)} addNewService={addNewService} categories={Categories} updateService={ServiceToUpdate} />}
            <SettingsHeader title="שירותיי העסק" sunTitle="בעמוד זה תוכלו לצפות ולערוך את שירותי העסק שלכם" />
            <div className={SerivcesSettingsStyle.SerivcesSettings}>
                <Breadcrumbs title="שירותיי העסק" />
                <Button onClick={() => setModal(true)} color="purple"> הוסף שירות חדש</Button>

                <div className={SerivcesSettingsStyle.Services}>
                    <table>
                        <thead className={SerivcesSettingsStyle.TableHeader}>
                            <tr>
                                <th>מספר</th>
                                <th>קטגוריה</th>
                                <th>שם</th>
                                <th>מחיר</th>
                                <th>זמן(דקות)</th>
                                <th>זמינות</th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Services.map(s =>
                                    <tr key={s.duration * s.price}>
                                        <td>{s.id}</td>
                                        <td>{s.category}</td>
                                        <td>{s.title}</td>
                                        <td>{s.price}₪</td>
                                        <td>{s.duration}</td>
                                        <td>
                                            {s.available ?
                                                <p className={SerivcesSettingsStyle.Available} style={{ background: '#7467ef' }}>פעיל</p> :
                                                <p className={SerivcesSettingsStyle.Available} style={{ color: 'rgba(52, 49, 76, 1)' }}>לא פעיל</p>
                                            }
                                        </td>
                                        <td>
                                            <MdDelete onClick={() => deleteService(s)} color="#e62163" />
                                            <MdModeEdit onClick={() => updateService(s)} color="#7467ef" />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className={SerivcesSettingsStyle.Button}>
                    <Button color="purple">שמירה שינויים <ArrowNext /></Button>
                </div>
            </div>
        </React.Fragment>
    )
}
