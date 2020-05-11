import React, { Component } from 'react';
import homeStyle from './home.module.scss';
import ChartHome from './components/chart/chart-home.home';
import TextBox from '../../../../models/ui/text-box/text-box';
import { FaDollarSign } from 'react-icons/fa';
import { TiGroup } from 'react-icons/ti';
import { BsPersonPlusFill } from 'react-icons/bs';
import { MdQueryBuilder } from 'react-icons/md';


class Home extends Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className={homeStyle.Home}>
                <div className={homeStyle.Chart}>
                    <p>:מספר הלקוחות בשנה האחרונה</p>
                    <div className={homeStyle.Graph}>
                        <ChartHome />
                    </div>
                    <div className={homeStyle.TextBox}>
                        {/* Numbers of costumers from the begining month */}
                        <TextBox height='100px' width='350px'>
                            <div className={homeStyle.Icon}>
                                <TiGroup size='2rem' />
                            </div>

                            <div className={homeStyle.Text}>
                                <div className={homeStyle.Title}>כותרת</div>
                                <div className={homeStyle.Content}>מידע מידע מידע</div>
                            </div>
                        </TextBox>

                        {/* Amount of money from the begining month */}
                        <TextBox height='100px' width='350px'>
                            <div className={homeStyle.Icon}>
                                <FaDollarSign size='2rem' />
                            </div>

                            <div className={homeStyle.Text}>
                                <div className={homeStyle.Title}>כותרת</div>
                                <div className={homeStyle.Content}>מידע מידע מידע</div>
                            </div>
                        </TextBox>

                        {/* The next costumer*/}
                        <TextBox height='100px' width='350px'>
                            <div className={homeStyle.Icon}>
                                <BsPersonPlusFill size='2rem' />
                            </div>

                            <div className={homeStyle.Text}>
                                <div className={homeStyle.Title}>כותרת</div>
                                <div className={homeStyle.Content}>מידע מידע מידע</div>
                            </div>
                        </TextBox>

                        {/* The last costumer */}
                        <TextBox height='100px' width='350px'>
                            <div className={homeStyle.Icon}>
                                <MdQueryBuilder size='2rem' />
                            </div>

                            <div className={homeStyle.Text}>
                                <div className={homeStyle.Title}>כותרת</div>
                                <div className={homeStyle.Content}>מידע מידע מידע</div>
                            </div>
                        </TextBox>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;
