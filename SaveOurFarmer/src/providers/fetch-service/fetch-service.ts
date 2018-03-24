import { Http, Headers, RequestOptions } from '@angular/http'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

/*
  Generated class for the FetchServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FetchServiceProvider {

  constructor(public http: Http) {

  }
  fetchFarmerDetails(): any {
    let urlFetchFarmerDetails = "http://www.yaaligal.org/saveFarmerAPIs/ourfarmers";
    return this.http.get(urlFetchFarmerDetails).map(response => {
      //console.log(response);
      return response.json()
    }
    )


  }
  fetchOverallContributors() {
    let urlFetchOverallContributors = "http://www.yaaligal.org/saveFarmerAPIs/contributors";
    return this.http.get(urlFetchOverallContributors).map(res => {
      return res.json();
    })
  }
  saveTransaction(contributorEmail, contibutorName, contributedAmount, benificier, contributorImage) {
    let postParameters = {
      "emailId": contributorEmail,
      "name": contibutorName,
      "amountPaid": contributedAmount,
      "farmerId": benificier,
      "image": contributorImage
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //let data = JSON.stringify(postParameters);
    let urlSaveTransaction = "http://www.yaaligal.org/saveFarmerAPIs/ourfarmers";
    return this.http.post(urlSaveTransaction, postParameters, options);

  }
}
