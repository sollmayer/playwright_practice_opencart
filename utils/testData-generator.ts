import { faker } from "@faker-js/faker";

export class TestDataGenerator {

    static generateString(length: number = 10) {
        return faker.string.alpha(length);
    }
    
    static generateFullName() {
		return faker.person.fullName();
	}

	static generateEmail(fullName: string) {
        return faker.internet.email({firstName:fullName.split(' ')[0]})
	}
    
    static generateEnquiry(minLength: number = 10, maxLength: number = 3000): string {
        let randomEnquiry = faker.hacker.phrase();

        while (randomEnquiry.length < minLength) {
            randomEnquiry += ` ${faker.lorem.word()}`
        }
        if (randomEnquiry.length > maxLength) {
            randomEnquiry = `${randomEnquiry.substring(0, maxLength - 3)} ...`;
        }
        return randomEnquiry;
    }

}
