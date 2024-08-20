import React, { PureComponent } from 'react';
import Img from './Img';

class Example extends PureComponent {
	render() {
		return (
			<div>
				<Img imgLoaded={this.props.imgLoaded} src="https://images.unsplash.com/photo-1572613000712-eadc57acbecd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3170&q=80" alt="falsy logo" />
				<Img imgLoaded={this.props.imgLoaded} src="https://images.unsplash.com/photo-1496886274628-64f00820aa76?ixlib=rb-1.2.1&auto=format&fit=crop&w=3152&q=80" alt="falsy logo" />
				<Img imgLoaded={this.props.imgLoaded} src="https://images.unsplash.com/photo-1518979353812-b492f6d6fedd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIzNTA3fQ&auto=format&fit=crop&w=1268&q=80" alt="falsy logo" />
			</div>
		)
	}
}

export default Example