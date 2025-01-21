import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';


const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  //Authorization: `Bearer `+ACCESS_TOKEN,
});

let requestOptions = { headers: headers };


@Injectable({
  providedIn: 'root'
})
export class Base64convertorService {

  constructor(
    private http: HttpClient,
    public router: Router,
    public toastr: ToastrService
  ) { }

  public b64toBlob(b64Data: any) {
    //  contentType = contentType || '';
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: "application/pdf" });
    console.log('blob =   ', blob);
    return blob;
  }
  getImage(base64data: string, date: string, siteName: any) {
    console.log('base64data =   ', base64data);
    console.log('date =   ', date);

    var blob = this.b64toBlob(base64data);

    let a = document.createElement("a");
    document.body.appendChild(a);
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = siteName + "_" + date + ".pdf";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

  }

  getData(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        switchMap(response => this.readFile(response))
      );
  }

  private readFile(blob: Blob): Observable<string> {
    return Observable.create((obs: { error: (arg0: ProgressEvent<FileReader>) => any; next: (arg0: string | ArrayBuffer | null) => any; complete: () => any; }) => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }


  pdfSrc = "";
  printPdfv2(base64: any): boolean {
    //let json: any =  { "type":"Buffer", "data":this.blob }
    //let bufferOriginal = Buffer.from(json.data);
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    this.pdfSrc = fileURL;

    if (fileURL != null) {
      console.log('printed');
      window.open(fileURL);
      return true;
    } else {
      return false;
    }
  }
  printPdf(base64: any) {
    console.log('base64 =' + base64);
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    this.pdfSrc = fileURL;
    console.log('printed');
    window.open(fileURL);

  }
  downloadPdfv2(base64: any, date: string, siteName: any) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    let pdfName = siteName + "_" + date + ".pdf";


    const nav = (window.navigator as any);
    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(file, pdfName);
    } else {
      //window.open(fileURL);

      // Construct the 'a' element
      let link = document.createElement("a");
      link.download = pdfName;
      link.target = "_blank";

      // Construct the URI
      link.href = fileURL;
      document.body.appendChild(link);
      link.click();

      // Cleanup the DOM
      document.body.removeChild(link);
    }


    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //  window.navigator.msSaveOrOpenBlob(file, pdfName);
    //}
  }

}
