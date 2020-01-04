import { Injectable } from '@angular/core';
import { TokenDecoderService } from './token-decoder.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class UserSession {

    public user: any;

    constructor(private tokenDecoderService: TokenDecoderService,
                private userService: UserService) {

                    const tokenInfo = this.tokenDecoderService.getDecodedAccessToken(localStorage.getItem('access_token'));
                    if (tokenInfo != null) {
                        this.userService.userInfo(tokenInfo.sub)
                                        .subscribe(responseUser => {
                                            this.user = responseUser.payload;
                                            console.log(this.user);
                                        },
                                        error => {
                                            console.log(error.error);
                                        });
                    }
    }
}
