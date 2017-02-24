import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// dependencies
import { NotificationsService } from 'angular2-notifications';
import * as _ from 'lodash';
import * as moment from 'moment';

//sdk
import { EntryApi } from '../../sdk/services';

// environment
import { environment } from '../../../environments/environment';

@Component({
	selector: 'base',
	templateUrl: './base.component.html',
	encapsulation: ViewEncapsulation.None

})
export class BaseComponent implements OnInit {
	public entry:any;
	public countdown = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	public countdownForm:FormGroup;
	public countdownFormSubmitted:boolean = false;
	public loading:boolean = true;

	private interval;

	public constructor(private _fb:FormBuilder, private _aRoute:ActivatedRoute, private _entry:EntryApi, private _notification:NotificationsService, private _router:Router) {}

	ngOnInit() {
		this._aRoute.params
		.subscribe((params:any) => {
			if(params.hasOwnProperty('slug') && !this.entry) {
				this._entry
				.findOne({
					where: {
						slug: params['slug'].toLowerCase()
					}
				})
				.subscribe((result:any) => {
					result.new = false;
					this.entry = result;
					this.loading = false;

					this.startCountdown();
				}, err => {
					console.log(err);
					this._notification.error("Oops!", "Something wen't wrong, try again later.");
				});
			}
			else {
				this.loading = false;
			}
		});

		this.createForm();
	}

	startCountdown() {
		if(this.calculateCountdown()) {
			this.interval = setInterval(() => {
				if(!this.calculateCountdown()) {
					clearInterval(this.interval);
				}
			}, 1000);
		}
	}

	calculateCountdown() {
		let rightNow = moment().local();
		let toGo = moment(this.entry.expireDate).local();

		let days = Math.floor(toGo.diff(rightNow, 'days'));
		this.countdown.days = days > 0 ? days : 0;
		toGo = toGo.subtract(this.countdown.days, 'days');

		let hours = Math.floor(toGo.diff(rightNow, 'hours'));
		this.countdown.hours = hours > 0 ? hours : 0;
		toGo = toGo.subtract(this.countdown.hours, 'hours');

		let minutes = Math.floor(toGo.diff(rightNow, 'minutes'));
		this.countdown.minutes = minutes > 0 ? minutes : 0;
		toGo = toGo.subtract(this.countdown.minutes, 'minutes');

		let seconds = Math.floor(toGo.diff(rightNow, 'seconds'));
		this.countdown.seconds = seconds > 0 ? seconds : 0;
		toGo = toGo.subtract(this.countdown.seconds, 'seconds');

		if(!days && !hours && !minutes && !seconds) {
			return false;
		}

		return true;
	}

	createForm() {
		this.countdownForm = this._fb.group({
			sender: ['', [Validators.required, Validators.maxLength(20)]],
			receiver: ['', [Validators.required, Validators.maxLength(20)]],
			description: ['', [Validators.required, Validators.maxLength(255)]],
			expireDateTime: ['', [Validators.required]]
		});
	}

	createEntry() {
		if(this.countdownForm.valid) {
			this.countdownFormSubmitted = true;

			let data = this.countdownForm.value;
			data.expireDate = moment(data.expireDateTime);
			delete data.expireDateTime;

			this._entry
			.create(data)
			.subscribe((result:any) => {
				result.new = true;
				result.url = environment.baseUrl + '/' + result.slug;

				this.entry = result;
				this.startCountdown();
				this.countdownForm.reset();
				this.countdownFormSubmitted = false;
				window.scrollTo(0,0);

				this._notification.success("Success!", "A slap countdown has been created, have fun!");
			}, err => {
				console.log(err);
				this.countdownFormSubmitted = false;
				this._notification.error("Oops!", "Something wen't wrong, try again later.");
			});
		}
	}
}
