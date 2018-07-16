import React from 'react';
import {connect} from 'react-redux';

import {actions as weatherActions} from '../weather/';

const CITY_COOES = {
    '北京': 101010100,
    '上海': 101020100,
    '广州': 101280101,
    '深圳': 101280601
}

class CitySelector extends React.Component{
    constructor() {
        super(...arguments);
        this.onchange = this.onchange.bind(this);
    }
    onchange(ev){
        const cityCode = ev.target.value;
        this.props.onSelectCity(cityCode)
    }
    componentDidMount() {
        const defaultCity = Object.keys(CITY_COOES)[0]
        this.props.onSelectCity(CITY_COOES[defaultCity])
    }

    render() {
        return(
            <select onChange={this.onchange}>
            {
                Object.keys(CITY_COOES).map(
                    cityName =>  <option key={cityName} value={CITY_COOES[cityName]}> {cityName}</option>
                )
            }
            </select>
        )
    }
    
    
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSelectCity: (cityCode) => {
            // 使用redux - thunk的关键 fetchWeather返回一个函数 thunk通过让store接受这个函数(通常只接受对象)
            dispatch(weatherActions.fetchWeather(cityCode))
        }
    }
}

export default connect(null, mapDispatchToProps)(CitySelector);