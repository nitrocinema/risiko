use risiko::contract::risiko::Risiko;
fn main() {
    let mut risiko = Risiko::new();
    println!(" {:#?} ", risiko.battle([3,3,3], [3,3,3]));
    println!(" {:#?} ", risiko.battle([2,2,2], [3,0,0]));
    println!(" {:#?} ", risiko.battle([3,3,3], [2,0,0]));
}