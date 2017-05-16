import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onSubmit(e) {
        const url = this.refs.url.value.trim();

        e.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.closeModal();
            } else {
                this.setState({ error: err.reason });
            }
        });
    }

    onChange(e) {
        this.setState({
            url: e.target.value
        })
    }

    closeModal() {
        this.setState({
            isOpen: false,
            error: '',
            url: ''
        })
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => { this.setState({ isOpen: true }) }}>+ Add Link</button>
                <Modal
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    onAfterOpen={() => { this.refs.url.focus() }}
                    onRequestClose={this.closeModal.bind(this)}>
                    <h1>Add Link</h1>
                    {this.state.error ? (<p>{this.state.error}</p>) : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input
                            type="text"
                            ref="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)} />
                        <button className="button">Add Link</button>
                        <button className="button button--secondary" type="button" onClick={this.closeModal.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
};