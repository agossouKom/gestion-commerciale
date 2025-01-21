import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment.prod';


 const baseUrl = environment.apiUrl + "/api/v1/employees";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }), responseType: 'text' as 'json'
};

getAll() {
    return this.http.get < Employee[] > (baseUrl);
}

getById(id: number) {
    return this.http.get < Employee > (`${baseUrl}/${id}`);
}

create(params: any) {
    return this.http.post(baseUrl, params, this.httpOptions);
}

//update(params: Employee) {
//    return this.http.put(`${baseUrl}`, params, this.httpOptions);
//}

update(id: number, value: Employee): Observable<Object> {
  return this.http.put(`${baseUrl}/${id}`, value, this.httpOptions);
}

delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`, this.httpOptions);
}

getEmployees() {
  return this.http.get<Employee[]>(baseUrl);
}

postEmployee(employee: Employee) {
  return this.http.post<Employee>(baseUrl, employee);
}

deleteEmployee(id: string) {
  return this.http.delete(baseUrl + '/' + id);
}
}
