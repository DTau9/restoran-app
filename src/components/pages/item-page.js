import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './item-page.scss';

class ItemPage extends Component {

	componentDidMount() {
		if (this.props.menuItems.length === 0) {
			this.props.menuRequested();

			const { RestoService } = this.props;
			RestoService.getMenuItems()
				.then(res => this.props.menuLoaded(res))
				.catch(error => this.props.menuError());
		}
	}

	render() {
		if (this.props.loading) {
			return (
				<div className="item_page">
					<Spinner />
				</div>
			)
		}

		if (this.props.error) {
			return (
				<div className="item_page">
					<Error />
				</div>
			)
		}

		const item = this.props.menuItems.find(el => +el.id === +this.props.match.params.id)

		const { title, url, category, price } = item;

		return (
			<div className="item-page">
				<li className="item-page__item">
					<span className={`item-page__icon item-page__icon-${category}`} />
					<div className="item-page__title">{title}</div>
					<img className="item-page__img" src={url} alt={title}></img>
					<div className="item-page__category">Category: <span>{category}</span></div>
					<div className="item-page__price">Price: <span>{price}$</span></div>
					<button className="item-page__btn">Add to cart</button>
				</li>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		menuItems: state.menu,
		loading: state.loading,
		error: state.error
	}
};

const mapDispatchToProps = {
	menuLoaded,
	menuRequested,
	menuError
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));