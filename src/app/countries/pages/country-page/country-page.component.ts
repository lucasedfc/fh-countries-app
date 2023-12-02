import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { pipe, switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  //get id by url
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.countriesService.searchByAlphaCode(id)))
      .subscribe(country => {
        if (!country) {
          this.router.navigateByUrl('').catch(() => "Error");
          return
        }
        this.country = country;
      });
  }

  get translations () {
    return Object.values(this.country?.translations ?? {});
  }
}
