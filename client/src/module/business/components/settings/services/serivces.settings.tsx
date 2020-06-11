import React, { useState, useEffect } from 'react';
import SerivcesSettingsStyle from './services.module.scss';
import SettingsHeader from '../../shared/header/settings-header.shared';
import { Service } from '../../../../../models/system/service';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Button from '../../../../../models/ui/button/button';
import Breadcrumbs from '../../../../../models/ui/breadcrumbs/breadcrumbs';
import AddService from './components/add-service/add-service.services';
import { ArrowNext } from '../../../../../assets/icons/icons';
import { connect } from 'react-redux';
import { postService, updateService, deleteService } from '../../../../../store/business/service/service.actions';
import { getLoading, getError, getServices } from '../../../../../store/business/service/service.selectors';
import { cloneDeep } from 'lodash'

interface StateProps {
    loading: boolean;
    error: string;
    services: Service[]
}

interface DispatchProps {
    postService: typeof postService;
    updateService: typeof updateService;
    deleteService: typeof deleteService;
}

type Props = DispatchProps & StateProps;
const SerivcesSettings: React.FC<Props> = (props) => {
    const [Categories, setCategories] = useState<string[]>([]);
    const [ServiceToUpdate, setServiceToUpdate] = useState<Service | null>(null)
    const [Modal, setModal] = useState(false);

    useEffect(() => {
        const c = props.services.map(s => s.category);
       const  arr = c.filter (function (value, index, array) { 
            return array.indexOf (value) == index;
        });
        setCategories(arr)
    }, [props.services]);

    const addNewService = (service: Service) => {
        if (service._id) {
            const s = cloneDeep(props.services.find(s => s._id === service._id));
            if (s === undefined) return;
            s.category = service.category;
            s.duration = service.duration;
            s.price = service.price;
            s.title = service.title;
            s.available = service.available;
            setServiceToUpdate(null);
            props.updateService(s);
        }
        else {
            props.postService(service);
        }
        setModal(false)
    }

    const deleteService = (service: Service) => {
        props.deleteService(service);
    }

    const updateService = (service: Service) => {
        if (props.services.find(s => s._id === service._id)) {
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
                                props.services.map((s: Service, i: number) =>
                                    <tr key={s._id}>
                                        <td>{i + 1}</td>
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

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    services: getServices(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postService: (service: Service) => dispatch(postService(service)),
    updateService: (service: Service) => dispatch(updateService(service)),
    deleteService: (service: Service) => dispatch(deleteService(service))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SerivcesSettings);