
namespace :test do
  endpoint = "https://9mzofxh4ji.execute-api.ap-northeast-1.amazonaws.com/dev"
 
  desc "POST lisy/evaluate"
  task :evaluate do
    sh "http -f POST #{endpoint}/lispy/evaluate code=1"
  end#
end
