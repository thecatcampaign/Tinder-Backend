import { User } from './../../modules/user/user.entity';

export interface IMatchedPartner extends Partial<User> {
    matchId: number
}